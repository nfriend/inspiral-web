using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Transitionals;

namespace InspiralWebScreenSaver
{
    public class SaverSettings
    {
        public const string SettingsFile = "InspirosaverSettings.xml";

        public double SlideShowSpeed { get; set; }
        public bool UseTransitions { get; set; }
        public double TransitionSpeed { get; set; }
        public List<TransitionName> Transitions { get; set; }

        public void Save()
        {
            string filePath = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData) + "\\" + SaverSettings.SettingsFile;

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            using (FileStream fs = new FileStream(filePath, FileMode.Create))
            {
                XmlSerializer x = new XmlSerializer(this.GetType());
                x.Serialize(fs, this);
            }
        }

        public bool Load()
        {
            string filePath = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData) + "\\" + SaverSettings.SettingsFile;

            if (File.Exists(filePath))
            {
                using (FileStream fs = new FileStream(filePath, FileMode.Open))
                {
                    XmlSerializer x = new XmlSerializer(this.GetType());
                    SaverSettings ss = x.Deserialize(fs) as SaverSettings;

                    this.SlideShowSpeed = ss.SlideShowSpeed;
                    this.UseTransitions = ss.UseTransitions;
                    this.TransitionSpeed = ss.TransitionSpeed;
                    this.Transitions = ss.Transitions;
                }

                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
