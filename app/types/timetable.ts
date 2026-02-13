import type { Destination } from './destination';
import type { Mode } from './mode';

export type Hour
  = | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23;

export type TimeTableToDestination = {
  [key in Destination]: {
    [key in Hour]: number[];
  };
};
export type TimeTable = {
  [key in Mode]: TimeTableToDestination
};

export type Time = [hour: number, minute: number];

export interface NextBus {
  toYakusa: {
    next: Time | undefined;
    afterNext: Time | undefined;
  };
  toAIT: {
    next: Time | undefined;
    afterNext: Time | undefined;
  };
}
