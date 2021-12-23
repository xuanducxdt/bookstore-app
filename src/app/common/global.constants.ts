export interface ScreenSize {
  XSmall: string;
    Small: string;
    Medium: string;
    Large: string;
    XLarge: string;
}

export class GlobalConstants {
  public static screenSize: ScreenSize = {
    XSmall: 'XSmall',
    Small: 'Small',
    Medium: 'Medium',
    Large: 'Large',
    XLarge: 'XLarge'
  }
}
