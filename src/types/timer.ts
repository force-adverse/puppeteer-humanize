export interface PerformanceTimer {
  readonly startedAt: number | undefined
  readonly stoppedAt: number | undefined

  start(): PerformanceTimer

  stop(): PerformanceTimer

  hasStarted(): boolean

  hasStopped(): boolean

  duration(): number | undefined
}
