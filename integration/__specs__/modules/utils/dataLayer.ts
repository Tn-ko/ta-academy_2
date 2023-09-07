import { waitFor } from '@Utils/waitFor';
import type { DataLayerEvent } from 'frontend/dataLayer/dataLayer';

const getDataLayer = (): Array<DataLayerEvent> => [...window.dataLayer];

const findInDataLayer = (eventQuery: DataLayerEvent): DataLayerEvent => {
    let dataLayer = getDataLayer().reverse();
    Object.entries(eventQuery).forEach(([key, value]) => {
        dataLayer = dataLayer.filter(event => event[key] === value);
    });
    return dataLayer[0];
};

const throwNoEventFoundError = (error: Error, eventQuery: DataLayerEvent): never => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const reduceMessage = (prev: string, [key, val]: [string, string]) => `${prev}${key}: "${val.toString()}" \n    `;

    const errorLog = Object.entries(eventQuery).reduce(reduceMessage, '   ');

    throw new Error(`Cannot find data layer events with the following parameters: \n ${errorLog} \n${error.stack}`);
};

/**
 * Finds last one fired event in Data Layer which corresponds the given query.
 *
 * @param eventQuery - Any event property or set of properties
 *
 * @param timeout - Sets custom timeout if necessary
 *
 * @returns - Data Layer Event.
 */
export const waitForDataLayer = async (eventQuery: DataLayerEvent, { timeout = 30 } = {}): Promise<DataLayerEvent> => {
    try {
        return await waitFor(() => findInDataLayer(eventQuery), { timeout });
    } catch (e) {
        throwNoEventFoundError(e as Error, eventQuery);
    }
};

export const findAllInDataLayer = (eventOrValue: string, prop = 'name'): DataLayerEvent[] =>
    getDataLayer().filter(elem => elem[prop] && elem[prop] === eventOrValue);
