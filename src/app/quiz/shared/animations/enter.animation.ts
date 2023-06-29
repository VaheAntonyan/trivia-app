import {animate, style, transition, trigger} from "@angular/animations";

export const enterAnimation = trigger('enterAnimation',
  [
    transition(
      ':enter',
      [
        style({height: 0, opacity: 0}),
        animate('0.3s ease-in-out',
          style({height: 0, opacity: 1}))
      ]
    ),
  ]
)
