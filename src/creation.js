import {
  of,
  from,
  scan,
  Observable,
  fromEvent,
  map,
  range,
  timer,
  interval,
  race,
} from "rxjs";

const stream$ = of("Hello", "world");

stream$.subscribe({
  next: (result) => console.log("Value: ", result),
  error: "",
  complete: "",
});

const array$ = from([1, 2, 3, 4]).pipe(
  scan((accumulator, value) => accumulator.concat(value), [])
);

array$.subscribe({
  next: (result) => console.log("Value: ", result),
  error: "",
  complete: "",
});

const stream2$ = new Observable((observer) => {
  observer.next("First value");

  setTimeout(() => observer.next("Second value after 1 sec"), 1000);

  setTimeout(() => observer.complete(), 1500);

  setTimeout(() => observer.error("Error!!!"), 2000);
  setTimeout(() => observer.next("Third value after 3 sec"), 3000);
});

stream2$.subscribe({
  next: (result) => console.log("Value: ", result),
  error: (error) => console.log(error),
  complete: () => console.log("Complete"),
});

fromEvent(document.querySelector("canvas"), "mousemove")
  .pipe(
    map((event) => ({
      x: event.offsetX,
      y: event.offsetY,
      context: event.target.getContext("2d"),
    }))
  )
  .subscribe({
    next: (position) => position.context.fillRect(position.x, position.y, 2, 2),
    error: (error) => console.log(error),
    complete: () => console.log("Complete"),
  });

const clear$ = fromEvent(document.getElementById("clear"), "click");
clear$.subscribe({
  next: () => {
    const canvas = document.querySelector("canvas");
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  },
  error: (error) => console.log(error),
  complete: () => console.log("Complete"),
});

const observable = interval(1000);
const subscription = observable.subscribe((x) => console.log(x));

setTimeout(() => subscription.unsubscribe(), 4000);

timer(2500).subscribe({
  next: (result) => console.log("Timer value: ", result),
  error: (error) => console.log(error),
  complete: () => console.log("Complete"),
});

range(42, 10).subscribe({
  next: (result) => console.log("Range value: ", result),
  error: (error) => console.log(error),
  complete: () => console.log("Complete"),
});

// https://www.youtube.com/watch?v=gCwSVQO_PtY
// 32 45
