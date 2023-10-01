// declare module '*.svg' {
//   const ReactComponent: FC<SVGProps<SVGSVGElement>>;
//   const content: string;

//   export { ReactComponent };
//   export default content;
// }

declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}