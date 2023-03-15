import { FC, PropsWithChildren } from "react";
import { Separator } from "./Separator";

export const DetailHeader: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="header-container">
    <div id="header" className="control">
      {children}
    </div>
    <Separator />
  </div>
);