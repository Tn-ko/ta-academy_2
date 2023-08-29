export type DataLayerEvent = {
  name: string;
  value?: string | number;
  price?: number
  quantity?: number;
};

export const pushToDataLayer = (event: DataLayerEvent): void => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  window.dataLayer.push(event);
};
