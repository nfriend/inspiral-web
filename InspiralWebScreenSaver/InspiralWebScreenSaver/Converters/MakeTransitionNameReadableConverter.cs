using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Data;
using System.Windows.Markup;

namespace InspiralWebScreenSaver.Converters
{
    public class MakeTransitionNameReadableConverter : MarkupExtension, IValueConverter
    {
        public MakeTransitionNameReadableConverter() { }

        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            string transitionName = value.ToString();
            transitionName = transitionName.Replace("Transition", String.Empty);
            transitionName = Regex.Replace(transitionName, "([a-z])([A-Z])", "$1 $2");
            transitionName = transitionName.Replace("And", "and");

            return transitionName;
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            throw new NotImplementedException();
        }

        public override object ProvideValue(IServiceProvider serviceProvider)
        {
            return this;
        }
    }
}
