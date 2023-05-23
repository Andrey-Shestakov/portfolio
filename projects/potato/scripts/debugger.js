class Debugger {
  /**
   * Вывести текстовый отчет в консоли
   * @param {string} string 
   */
  static log(string) {
    /** @type {string} */
    let time = this.getCurrentTime();
    console.log(`[${time}] [DEBUG] ${string}`);
  }

  /**
   * Получить актуальное время
   * @returns {string}
   */
  static getCurrentTime() {
    /** @type {Date} */
    let dateCurrent = new Date();
    /** @type {string} */
    let dateCurrentHours = dateCurrent.getHours().toString().padStart(2, '0');
    /** @type {string} */
    let dateCurrentMinutes = dateCurrent.getMinutes().toString().padStart(2, '0');
    /** @type {string} */
    let dateCurrentSeconds = dateCurrent.getSeconds().toString().padStart(2, '0');

    return `${dateCurrentHours}:${dateCurrentMinutes}:${dateCurrentSeconds}`;
  }
}