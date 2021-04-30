using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transitionals.Transitions;

namespace InspiralWebScreenSaver
{
    public enum TransitionName
    {
        DoubleRotateWipe,
        HorizontalBlinds,
        Star,
        Rotate,
        VerticalBlinds,
        Roll,
        HorizontalWipe,
        FadeAndGrow,
        Door,
        Explosion,
        VerticalWipe,
        Translate,
        Melt,
        Fade,
        Checkerboard,
        Page,
        Dots,
        DiagonalWipe,
        Diamonds,
        RotateWipe,
        Flip,
        FadeAndBlur
    }

    public class TransitionMapping
    {
        public Type this[TransitionName t]
        {
            get
            {
                switch (t)
                {
                    case TransitionName.DoubleRotateWipe:
                        return typeof(DoubleRotateWipeTransition);
                    case TransitionName.HorizontalBlinds:
                        return typeof(HorizontalBlindsTransition);
                    case TransitionName.Star:
                        return typeof(StarTransition);
                    case TransitionName.Rotate:
                        return typeof(RotateTransition);
                    case TransitionName.VerticalBlinds:
                        return typeof(VerticalBlindsTransition);
                    case TransitionName.Roll:
                        return typeof(RollTransition);
                    case TransitionName.HorizontalWipe:
                        return typeof(HorizontalWipeTransition);
                    case TransitionName.FadeAndGrow:
                        return typeof(FadeAndGrowTransition);
                    case TransitionName.Door:
                        return typeof(DoorTransition);
                    case TransitionName.Explosion:
                        return typeof(ExplosionTransition);
                    case TransitionName.VerticalWipe:
                        return typeof(VerticalWipeTransition);
                    case TransitionName.Translate:
                        return typeof(TranslateTransition);
                    case TransitionName.Melt:
                        return typeof(MeltTransition);
                    case TransitionName.Fade:
                        return typeof(FadeTransition);
                    case TransitionName.Checkerboard:
                        return typeof(CheckerboardTransition);
                    case TransitionName.Page:
                        return typeof(PageTransition);
                    case TransitionName.Dots:
                        return typeof(DotsTransition);
                    case TransitionName.DiagonalWipe:
                        return typeof(DiagonalWipeTransition);
                    case TransitionName.Diamonds:
                        return typeof(DiamondsTransition);
                    case TransitionName.RotateWipe:
                        return typeof(RotateWipeTransition);
                    case TransitionName.Flip:
                        return typeof(FlipTransition);
                    case TransitionName.FadeAndBlur:
                        return typeof(FadeAndBlurTransition);
                    default:
                        return typeof(FadeTransition);
                }
            }
        }
    }
}
