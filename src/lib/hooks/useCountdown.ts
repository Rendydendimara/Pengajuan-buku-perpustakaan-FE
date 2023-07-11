import { useState, useEffect } from 'react';

function useCountdown(mins: any) {
  const [secs, decrement] = useState<any>(mins * 60);
  const [progress, increment] = useState<any>(0);

  useEffect(() => {
    if (secs > 0) {
      const progressLevel = setInterval(() => {
        increment(progress + 100 / (mins * 60));
        decrement(secs - 1);
      }, 1000);
      return () => clearInterval(progressLevel);
    }
  }, [progress, secs, mins]);
  let d: any = parseInt(String(secs / (3600 * 24)));
  let h: any = parseInt(String((secs % (3600 * 24)) / 3600));
  let m: any = parseInt(String((secs % 3600) / 60));
  let sec: any = parseInt(String(secs % 60), 10);
  let seconds: any = sec < 10 ? '0' + sec : sec;
  const daysDisplay: any = d < 10 ? '0' + d : d;
  const hoursDisplay: any = h < 10 ? '0' + h : h;
  const minutesDisplay: any = m < 10 ? '0' + m : m;
  return [progress, seconds, daysDisplay, hoursDisplay, minutesDisplay];
}

export default useCountdown;
