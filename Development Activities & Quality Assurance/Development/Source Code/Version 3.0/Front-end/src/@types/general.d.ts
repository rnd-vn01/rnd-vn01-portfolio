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

interface IInput {
  value?: string;
  placeholder?: string;
  type?: 'password' | 'email' | 'text' | 'number';
  onChange?: ((event: React.ChangeEvent<HTMLInputElement, React.ChangeEvent>) => void) | undefined;
  required?: boolean;
  label?: string;
  error?: string;
  readonly?: boolean;
  name?: string;
}

interface IButton {
  theme?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  caption?: string;
  logo?: any;
  name?: string;
}
