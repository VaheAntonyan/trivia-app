import {animate, style, transition, trigger} from "@angular/animations";

export const leaveAnimation = trigger('leaveAnimation',
  [
    transition(
      ':leave',
      [
        style({height: 0, opacity: 1}),
        animate('0.3s ease-in-out',
          style({height: 0, opacity: 0}))
      ]
    )
  ]
)
