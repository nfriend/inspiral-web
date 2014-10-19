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
        string getAllImagesScriptName = "getallimagenames.php?i=100000";
        int slideshowSpeed = 10000;
        int transitionSpeed = 2000;
        bool useTransitions = true;
        List<TransitionName> transitionsToUse = new List<TransitionName>();
        Random random = new Random();
        TransitionMapping transitionMapping = new TransitionMapping();
        private int originalMouseX;
        private int originalMouseY;

        public MainWindow(SaverSettings settings)
            : this()
        {
            this.slideshowSpeed = (int)(settings.SlideShowSpeed * 1000);
            this.transitionSpeed = (int)(settings.TransitionSpeed * 1000);
            this.transitionsToUse = settings.Transitions;
            this.useTransitions = settings.UseTransitions;

            if (transitionsToUse.Count == 0)
                this.useTransitions = false;
        }

        public MainWindow()
        {
            InitializeComponent();
            this.Loaded += new RoutedEventHandler(async (o, e) => { await initialize(); });

            originalMouseX = System.Windows.Forms.Control.MousePosition.X;
            originalMouseY = System.Windows.Forms.Control.MousePosition.Y;
        }

        private async Task moveToNextPicture()
        {
            if (currentRecord == null)
                currentRecord = imageRecords.Last();

            currentRecord = imageRecords[(imageRecords.IndexOf(currentRecord) + 1) % imageRecords.Count];
            string imagePath = await getImagePath(new Uri(System.IO.Path.Combine(baseUrl, currentRecord.ImagePath)), System.IO.Path.GetFileName(currentRecord.ImagePath));
            ImageContainer.Transition = useTransitions ? getRandomTransition() : null;
            ImageContainer.Content = new Image() { Source = new BitmapImage(new Uri(imagePath)) };
        }

        private Transitionals.Transition getRandomTransition()
        {
            return (Transition)Activator.CreateInstance(transitionMapping[transitionsToUse[random.Next(0, transitionsToUse.Count)]]);
        }

        private async Task initialize()
        {
            imageRecords = await getImageRecordsAsync(new Uri(System.IO.Path.Combine(baseUrl, getAllImagesScriptName)));

            while (true)
            {
                await moveToNextPicture();
                await Task.Delay(slideshowSpeed);
            }
        }

        private async Task<List<ImageRecord>> getImageRecordsAsync(Uri uri)
        {
            List<ImageRecord> records = new List<ImageRecord>();
            using (var webClient = new WebClient())
            {
                var json = await webClient.DownloadStringTaskAsync(uri);
                Dictionary<string, dynamic> response = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(json);
                foreach (dynamic i in response["images"])
                {
                    var currentImage = JsonConvert.DeserializeObject<RawImageRecord>(i.ToString()) as RawImageRecord;
                    records.Add(new ImageRecord() { ImagePath = currentImage.ImagePath, TimeStamp = UnixTimeStampToDateTime(currentImage.TimeStamp) });
                }
            }

            records.Reverse();

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

        private void Window_MouseMove(object sender, MouseEventArgs e)
        {
            int delta = Math.Abs(System.Windows.Forms.Control.MousePosition.X - originalMouseX) + Math.Abs(System.Windows.Forms.Control.MousePosition.Y - originalMouseY);
            if (delta < 100)
                return;
            else
                App.Current.Shutdown();
        }

        private void Window_KeyDown(object sender, KeyEventArgs e)
        {
            Application.Current.Shutdown();
        }
    }
}
