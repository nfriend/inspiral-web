using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using Transitionals;
using Transitionals.Transitions;

namespace InspiralWebScreenSaver
{
    public class SettingsViewModel : BaseViewModel
    {
        public SettingsViewModel()
        {
            Transitions =  Enum.GetValues(typeof(TransitionName)).Cast<TransitionName>().Select(x => new TransitionSelection { IsChecked = false, Transition = x }).ToList();
            _setDefaults();
        }

        public SettingsViewModel(SaverSettings settings)
            : this()
        {
            foreach(TransitionSelection t in Transitions)
            {
                t.IsChecked = false;
            }

            foreach (TransitionName t in settings.Transitions)
            {
                this.Transitions.Where(x => x.Transition == t).First().IsChecked = true;
            }

            this.SlideShowSpeed = settings.SlideShowSpeed;
            this.TransitionSpeed = settings.TransitionSpeed;
            this.UseTransitions = settings.UseTransitions;
        }

        private List<TransitionSelection> _transitions;
        public List<TransitionSelection> Transitions
        {
            get { return _transitions; }
            set { _transitions = value; NotifyPropertyChanged("TransitionName"); }
        }

        private double _slideShowSpeed = 10;
        public double SlideShowSpeed
        {
            get { return _slideShowSpeed; }
            set { _slideShowSpeed = value; NotifyPropertyChanged("SlideShowSpeed"); }
        }

        private double _transitionSpeed = 2;
        public double TransitionSpeed
        {
            get { return _transitionSpeed; }
            set { _transitionSpeed = value; NotifyPropertyChanged("TransitionSpeed"); }
        }

        private bool _useTransitions = true;
        public bool UseTransitions
        {
            get { return _useTransitions; }
            set { _useTransitions = value; NotifyPropertyChanged("UseTransitions"); }
        }

        public ICommand Save
        {
            get
            {
                return new RelayCommand((arg) =>
                {
                    SaverSettings newSettings = new SaverSettings()
                    {
                        SlideShowSpeed = this.SlideShowSpeed,
                        TransitionSpeed = this.TransitionSpeed,
                        UseTransitions = this.UseTransitions,
                        Transitions = new List<TransitionName>()
                    };

                    newSettings.Transitions.AddRange(Transitions.Where(x => x.IsChecked).Select(x => x.Transition));

                    newSettings.Save();

                    Application.Current.MainWindow.Close();
                });
            }
        }

        private void _setDefaults()
        {
            var transitionsToCheck = Transitions.Where(x =>
                x.Transition == TransitionName.FadeAndBlur
                || x.Transition == TransitionName.FadeAndGrow
                || x.Transition == TransitionName.Fade
                || x.Transition == TransitionName.Roll
                || x.Transition == TransitionName.Translate
            );

            foreach (var transition in transitionsToCheck)
            {
                transition.IsChecked = true;
            }

            UseTransitions = true;
            TransitionSpeed = 2;
            SlideShowSpeed = 10;
        }
    }

    public class TransitionSelection : BaseViewModel
    {
        private bool _isChecked = false;
        public bool IsChecked
        {
            get { return _isChecked; }
            set { _isChecked = value; NotifyPropertyChanged("IsChecked"); }
        }

        private TransitionName _transition;
        public TransitionName Transition
        {
            get { return _transition; }
            set { _transition = value; NotifyPropertyChanged("Transition"); }
        }
    }
}
