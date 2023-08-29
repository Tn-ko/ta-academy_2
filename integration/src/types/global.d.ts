import { DataLayerEvent } from "../dataLayer/dataLayer";

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}
