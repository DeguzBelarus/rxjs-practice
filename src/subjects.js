import { Subject, BehaviorSubject, ReplaySubject } from "rxjs";

document.addEventListener("click", () => {
  const stream$ = new Subject();

  stream$.subscribe((value) => console.log("Value: ", value));

  stream$.next("Hello");
  stream$.next("Rx");
  stream$.next("JS");
});

document.addEventListener("click", () => {
  const stream$ = new BehaviorSubject("First!");

  stream$.subscribe((value) => console.log("Value: ", value));

  stream$.next("Hello");
  stream$.next("Rx");
  stream$.next("JS");
});

document.addEventListener("click", () => {
  const stream$ = new ReplaySubject(2);

  stream$.next("Hello");
  stream$.next("Rx");
  stream$.next("JS");

  stream$.subscribe((value) => console.log("Value: ", value));
});
