using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;

namespace InspirographScreenSaver
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : System.Windows.Application
    {
        private void ApplicationStartup(object sender, StartupEventArgs e)
        {
            foreach (Screen s in Screen.AllScreens)
            {
                if (s != Screen.PrimaryScreen)
                {
                    Blackout blackOut = new Blackout();
                    blackOut.Top = s.WorkingArea.Top;
                    blackOut.Left = s.WorkingArea.Left;
                    blackOut.Width = s.WorkingArea.Width;
                    blackOut.Height = s.WorkingArea.Height;
                    blackOut.Show();
                }
            }

            MainWindow mw = new MainWindow();
            mw.Show();
        }
    }
}
