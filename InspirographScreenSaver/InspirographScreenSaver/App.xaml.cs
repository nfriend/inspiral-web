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

            // Preview mode--display in little window in Screen Saver dialog
            // (Not invoked with Preview button, which runs Screen Saver in
            // normal /s mode).
            if (e.Args[0].ToLower().StartsWith("/p"))
            {
                System.Environment.Exit(1);
            }
            // Normal screensaver mode.  Either screen saver kicked in normally,
            // or was launched from Preview button
            else if (e.Args[0].ToLower().StartsWith("/s"))
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

                SaverSettings settings = new SaverSettings();
                if (settings.Load())
                    (new MainWindow(settings)).Show();
                else
                    (new MainWindow()).Show();

            }
            else if (e.Args[0].ToLower().StartsWith("/c"))
            {
                SaverSettings settings = new SaverSettings();
                if (settings.Load())
                    (new SettingsWindow(settings)).Show();
                else
                    (new SettingsWindow()).Show();
                

                
            }
            // If not running in one of the sanctioned modes, shut down the app
            // immediately (because we don't have a GUI).
            else
            {
                System.Environment.Exit(1);
            }
        }
    }
}
