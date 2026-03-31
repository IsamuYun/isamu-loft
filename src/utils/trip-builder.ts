import getDistance from '@turf/rhumb-distance';
import getBearing from '@turf/rhumb-bearing';

// 定义坐标点类型 [lng, lat]
type Point = [number, number];

interface Keyframe {
  point: Point;
  time: number;
  heading?: number; // 初始点可能没有朝向
}

interface TripBuilderOptions {
  waypoints: Point[];
  speed?: number;     // 米/秒
  turnSpeed?: number; // 度/秒
  loop?: boolean;
}

interface Frame {
  point: Point;
  heading: number;
}

export default class TripBuilder {
  keyframes: Keyframe[] = [];
  speed: number;
  turnSpeed: number;
  loop: boolean;
  totalTime: number = 0;

  constructor({
    waypoints,
    speed = 10,
    turnSpeed = 45,
    loop = false
  }: TripBuilderOptions) {
    this.speed = speed;
    this.turnSpeed = turnSpeed;
    this.loop = loop;

    for (const p of waypoints) {
      this._moveTo(p);
    }
    
    if (loop && waypoints.length > 2) {
      this._moveTo(waypoints[0]);
      // 这里的断言是因为在 _moveTo 逻辑后，第一个 keyframe 必然已有 heading
      this._turnTo(this.keyframes[0].heading as number);
    }
  }

  private _moveTo(point: Point): void {
    if (this.keyframes.length === 0) {
      this.keyframes.push({
        point,
        time: 0
      });
      return;
    }

    const prevKeyframe = this.keyframes[this.keyframes.length - 1];
    // Turf 返回的是公里，转为米
    const distance = getDistance(prevKeyframe.point, point, { units: 'kilometers' }) * 1000;
    const heading = getBearing(prevKeyframe.point, point);

    // 过滤掉距离过短的点，避免计算抖动
    if (distance < 0.1) {
      return;
    }

    if (prevKeyframe.heading === undefined) {
      prevKeyframe.heading = heading;
    } else {
      this._turnTo(heading);
    }

    const duration = distance / this.speed;
    this.totalTime += duration;

    this.keyframes.push({
      point,
      heading,
      time: this.totalTime
    });
  }

  private _turnTo(heading: number): void {
    const prevKeyframe = this.keyframes[this.keyframes.length - 1];
    const angle = Math.abs(getTurnAngle(prevKeyframe.heading!, heading));

    if (angle > 0) {
      const duration = angle / this.turnSpeed;
      this.totalTime += duration;
      this.keyframes.push({
        point: prevKeyframe.point,
        heading,
        time: this.totalTime
      });
    }
  }

  public getFrame(timestamp: number): Frame {
    const t = this.loop ? timestamp % this.totalTime : Math.min(timestamp, this.totalTime);
    
    // 找到当前时间戳对应的关键帧索引
    const i = this.keyframes.findIndex(s => s.time >= t);
    
    // 如果是第一帧或没找到，返回初始位置
    if (i <= 0) {
      return {
        point: this.keyframes[0].point,
        heading: this.keyframes[0].heading || 0
      };
    }

    const startState = this.keyframes[i - 1];
    const endState = this.keyframes[i];
    
    // 计算插值比例
    const r = (t - startState.time) / (endState.time - startState.time);

    return {
      point: [
        startState.point[0] * (1 - r) + endState.point[0] * r,
        startState.point[1] * (1 - r) + endState.point[1] * r
      ],
      // 考虑到航向角转弯的插值
      heading: startState.heading! + getTurnAngle(startState.heading!, endState.heading!) * r
    };
  }
}

function getTurnAngle(startHeading: number, endHeading: number): number {
  let turnAngle = endHeading - startHeading;
  if (turnAngle < -180) turnAngle += 360;
  if (turnAngle > 180) turnAngle -= 360;
  return turnAngle;
}