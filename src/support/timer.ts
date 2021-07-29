import { PerformanceTimer } from "../types"

/**
 * Basic start / stop performance timer for collecting data on action durations.
 * Used as the return type for most action functions.
 *
 * @class Timer
 * @implements PerformanceTimer
 */
export class Timer implements PerformanceTimer {
  /**
   * Internally tracks the registered start time.
   * @type {number | undefined}
   * @private
   */
  private _startedAt: number | undefined

  /**
   * Internally tracks the registered stop time.
   * @type {number | undefined}
   * @private
   */
  private _stoppedAt: number | undefined

  /**
   * Read only accessor for the start time.
   * @return {number | undefined}
   */
  public get startedAt(): number | undefined {
    return this._startedAt
  }

  /**
   * Read only accessor for the stop time.
   * @return {number | undefined}
   */
  public get stoppedAt(): number | undefined {
    return this._stoppedAt
  }

  /**
   * Command to start the timer.
   * Returns self for chaining.
   */
  public start(): PerformanceTimer {
    this._startedAt = Date.now()
    return this
  }

  /**
   * Command to stop the timer.
   * Returns self for chaining.
   */
  public stop(): PerformanceTimer {
    this._stoppedAt = Date.now()
    return this
  }

  /**
   * Determines if the timer has started.
   *
   * @return {boolean}
   */
  public hasStarted(): boolean {
    return !!this._startedAt
  }

  /**
   * Determines if the timer has stopped.
   *
   * @return {boolean}
   */
  public hasStopped(): boolean {
    return !!this._stoppedAt
  }

  /**
   * Calculates the duration of the timer, provided the timer has stopped.
   *
   * @return {number | undefined}
   */
  public duration(): number | undefined {
    return this._startedAt && this._stoppedAt
      ? this._stoppedAt - this._startedAt
      : undefined
  }
}
