using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Transitionals;
using Transitionals.Transitions;

namespace InspirographScreenSaver
{
    public partial class MainWindow : Window
    {
        List<ImageRecord> imageRecords = new List<ImageRecord>();
        ImageRecord currentRecord = null;
        string baseUrl = "http://nathanfriend.com/inspirograph/";
        string getAllImagesScriptName = "getallimagenames.php";
        int pauseDuration = 10000;
        int transitionDuration = 2000;
        Random random = new Random();

        public MainWindow()
        {
            InitializeComponent();
            this.Loaded += new RoutedEventHandler(async (o, e) => { await initialize(); });
        }

        private async Task moveToNextPicture()
        {
            if (currentRecord == null)
                currentRecord = imageRecords.Last();

            currentRecord = imageRecords[(imageRecords.IndexOf(currentRecord) + 1) % imageRecords.Count];
            string imagePath = await getImagePath(new Uri(System.IO.Path.Combine(baseUrl, currentRecord.ImagePath)), System.IO.Path.GetFileName(currentRecord.ImagePath));
            ImageContainer.Transition = getSemiRandomTransition();
            ImageContainer.Content = new Image() { Source = new BitmapImage(new Uri(imagePath)) };
        }


        /// <summary>
        /// Returns one of any of the transitions that inherits from Transition
        /// </summary>
        /// <returns></returns>
        private Transitionals.Transition getRandomTransition()
        {
            var types = AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes()).Where(x => typeof(Transitionals.Transition).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract).ToList();
            foreach (var t in types.OrderBy(x => x.Name))
                Console.WriteLine(t.Name);
            int randomIndex = random.Next(0, types.Count);
            var transition = (Transitionals.Transition)(Activator.CreateInstance(types[randomIndex]));

            try { transition.Duration = new Duration(TimeSpan.FromMilliseconds(transitionDuration)); }
            catch (NotSupportedException) { }

            return transition;
        }

        /// <summary>
        /// Returns a few of the more subtle Transitions
        /// </summary>
        /// <returns></returns>
        private Transitionals.Transition getSemiRandomTransition()
        {
            Transition transition = null;
            switch (random.Next(0, 5))
            {
                case 0:
                    transition = new FadeAndBlurTransition();
                    break;
                case 1:
                    transition = new FadeAndGrowTransition();
                    break;
                case 2:
                    transition = new FadeTransition();
                    break;
                case 3:
                    transition = new RollTransition();
                    break;
                default:
                    transition = new TranslateTransition();
                    break;
            }
            
            try { transition.Duration = new Duration(TimeSpan.FromMilliseconds(transitionDuration)); }
            catch (NotSupportedException) { }

            return transition;
        }

        private async Task initialize()
        {
            imageRecords = await getImageRecordsAsync(new Uri(System.IO.Path.Combine(baseUrl, getAllImagesScriptName)));

            while (true)
            {
                await moveToNextPicture();
                await Task.Delay(pauseDuration);
            }
        }

        private async Task<List<ImageRecord>> getImageRecordsAsync(Uri uri)
        {
            List<ImageRecord> records = new List<ImageRecord>();
            using (var webClient = new WebClient())
            {
                var json = await webClient.DownloadStringTaskAsync(uri);
                Dictionary<string, dynamic> response = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(json);
                foreach (dynamic i in response.Values.ToList())
                {
                    var currentImage = JsonConvert.DeserializeObject<RawImageRecord>(i.ToString()) as RawImageRecord;
                    records.Add(new ImageRecord() { ImagePath = currentImage.ImagePath, TimeStamp = UnixTimeStampToDateTime(currentImage.TimeStamp) });
                }
            }

            return records;
        }

        private async Task<string> getImagePath(Uri uri, string fileName)
        {
            string imagePath = System.IO.Path.Combine(System.IO.Path.GetTempPath(), fileName);
            if (!File.Exists(imagePath))
            {
                using (var webClient = new WebClient())
                {
                    await webClient.DownloadFileTaskAsync(uri, imagePath);
                }
            }

            return imagePath;
        }

        private static DateTime UnixTimeStampToDateTime(string unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(Double.Parse(unixTimeStamp)).ToLocalTime();
            return dtDateTime;
        }

        class RawImageRecord
        {
            public string ImagePath { get; set; }
            public string TimeStamp { get; set; }
        }

        private void Window_MouseDown(object sender, MouseButtonEventArgs e)
        {
            Application.Current.Shutdown();
        }
    }
}
