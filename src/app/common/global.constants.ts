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
  };
  public static apiUrl: string = 'http://localhost:8000';
  public static token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxYzkyMTgzZmYwZWY2Y2I2NjJlZTE3NyIsImZ1bGxOYW1lIjoiWHXDom4gxJDhu6ljIiwiZW1haWwiOiJ4ZHRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MDU3NTA0OSwiZXhwIjoxNjQzNTc1MDQ5fQ.yMdVZnorsGLWzhjt_XNqpdwCXQG5W0Rpl-RPZeIUWTg';
}
