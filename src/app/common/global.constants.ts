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
  public static token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYxYzE5YjE1YmU5MDI3NjcwYWI5ZjlhYyIsImZ1bGxOYW1lIjoiTGlzYSBOZ3V54buFbiIsImVtYWlsIjoibGlzYUB4ZHQuY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MDI1MTEyOCwiZXhwIjoxNjQzMjUxMTI4fQ.IhmH_tEBdrzpLklnD88AVE2yVdO_lKgt1da0DY2ZBWQ';
}
