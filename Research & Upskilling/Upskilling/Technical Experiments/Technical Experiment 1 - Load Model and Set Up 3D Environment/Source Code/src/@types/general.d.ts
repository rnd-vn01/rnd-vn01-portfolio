interface IBasicRoute {
  component?: any;
  layout?: any;
  path: string;
  isPrivate: boolean;
  header?: Component;
  exact?: boolean;
  isLogoOnlyHeader?: boolean;
}

interface ILayout {
  header?: Component;
  children?: any;
}
