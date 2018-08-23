const SCREEN_HEIGHT = window.innerHeight;
const WS_URL = "wss://echo.websocket.org/";
const CSS_STYLE = {
  '#messanger': {
    'position': 'fixed',
    'bottom': '30px',
    'right': '30px',
    'borderRadius': '4px',
    'border': 'solid 2px',
  },
  '#messanger__output': {
    'height': '100px',
    'minHeight': '100px',
    'maxheight': '100px',
    'overflow': 'auto',
    'margin': '15px',
  },
  '#messanger__title': {
    'padding': '15px',
    'fontSize': '15px',
    'borderBottom': 'solid 2px',
  },
  '#messanger__footer': {
    'padding': '15px',
    'fontSize': '15px',
    'borderTop': 'solid 2px',
  }
};

/**
 * Messenger model with Web Socket
 *
 * @autor SHTIKOV
 * @version 0.01
 * 
 * @param {object} outputElement: Field for view messages
 * @param {object} messageTextareaElement: Field for message
 * @param {object} sendButtonElement: Send message button
 * @param {string} title: Title messenger
 * @param {json} cssStyles: Default styles for form
 *
 * Private methods:
 *   @method appendStyles: For install default styles
 *   @method init: Initialisation method
 *   @method createForm: Creating form
 *   @method connectWS: Connect to Web Socket
 * 
 * Public methods:
 *   @method updateTitle: for update title in form
 *   @method write: Write on page and send message to Web Socket
 *   @method wsSend: Send message to Web Socket
 *   @method removeStyles: Remove styles from form
 */
function Messenger () {
  var self = this;

  /**
   * DOM elements
   */
  self.messengerElement       = document.createElement ("div");
  self.outputElement          = document.createElement ("div");
  self.titleElement           = document.createElement ("div");
  self.footerElement          = document.createElement ("div");
  self.messageTextareaElement = document.createElement ("textarea");
  self.sendButtonElement      = document.createElement ("a");

  /** @type {String} title */
  self.title = "Стандартный заголовок";
  /** @type {json} cssStyles */
  self.cssStyles = CSS_STYLE;


  /**
   * Initialisation method
   * 
   * @return {void}
   */
  self.init = function () {
    self.createForm ();
    self.connectWS ();
  }

  /**
   * Creating form
   * 
   * @return {void}
   */
  self.createForm = function () {
    self.messengerElement.setAttribute('id', 'messanger');
    
    self.titleElement.setAttribute ('id', 'messanger__title');
    self.titleElement.innerHTML = self.title;
    self.messengerElement.appendChild (self.titleElement);

    self.outputElement.setAttribute ('id', 'messanger__output');
    self.messengerElement.appendChild (self.outputElement);

    self.footerElement.setAttribute ('id', 'messanger__footer');
    self.messengerElement.appendChild (self.footerElement);

    self.messageTextareaElement.setAttribute ('id', 'messanger__output-message');
    self.messageTextareaElement.setAttribute ('row', '3');
    self.messageTextareaElement.setAttribute ('placeholder', 'Сообщение');
    self.footerElement.appendChild (self.messageTextareaElement);

    self.sendButtonElement.classList.add ("messanger__footer-button");
    self.sendButtonElement.innerHTML = 'Отправить';
    self.sendButtonElement.onclick = function () {
      self.sendMessage ();
    };
    self.footerElement.appendChild (self.sendButtonElement);
    
    document.body.appendChild (self.messengerElement);
    self.appendStyles ();
  }

  self.updateTitle = function (title) {
    self.titleElement.innerHTML = title;
  }

  /**
   * Install styles for form
   * 
   * @return {void}
   */
  self.appendStyles = function () {
    let value, element;

    for (elem in self.cssStyles) {
      element = document.querySelector (elem);

      if (element != null) {
        for (style in self.cssStyles[elem]) {
          value = self.cssStyles[elem][style];
          element.style[style] = value;
        }
      }
    }
  }

  /**
   * Remove styles from DOM
   * 
   * @return {void}
   */
  self.removeStyles = function () {
    let elements = document.getElementsByTagName ("style");

    if (elements.length) {
      for (i in elements) {
        elements[i].parentNode.removeChild (elements[i]);
      }
    }
  }

  /**
   * Connecting to Web Socket
   * 
   * @return {void}
   */
  self.connectWS = function () {
    websocket = new WebSocket (WS_URL);
    websocket.onopen = function (evt) { self.onOpen (evt) };
    websocket.onclose = function (evt) { self.onClose (evt) };
    websocket.onmessage = function (evt) { self.onMessage (evt) };
    websocket.onerror = function (evt) { self.onError (evt) };
  }

  /**
   * Hook on open Web Socked
   * 
   * @return {void}
   */
  self.onOpen = function (evt) {
    self.titleElement.innerHTML += "<span style='color: green;' title='Подключено'>✔</span>";
  }

  /**
   * Hook on close Web Socked
   * 
   * @return {void}
   */
  self.onClose = function (evt) {
    self.write ("<span style='color: red;'>DISCONNECTED</span>");
  }

  /**
   * Hook on error Web Socked
   * 
   * @return {void}
   */
  self.onError = function (evt) {
    self.write ('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  /**
   * Hook on sent message Web Socked
   * 
   * @return {void}
   */
  self.onMessage = function (evt) {
    let lastChild = self.outputElement.lastChild;

    lastChild.classList.add ("msg-success");

    setTimeout (function () {
      lastChild.classList.add ("writed");
    }, 1000);

    self.outputElement.scrollTop = self.outputElement.scrollHeight;
  }

  /**
   * Get message from form and send to Web Socket
   * 
   * @return {void}
   */
  self.sendMessage = function () {
    let msgElem = document.getElementById ("messanger__output-message");
    self.wsSend (msgElem.value);
  }

  /**
   * Write message to output element in form
   * 
   * @return {void}
   */
  self.write = function (message) {
    let msg = document.createElement ("div");
    msg.classList.add ("msg-item");
    msg.innerHTML = message;
    self.outputElement.appendChild (msg);
    self.appendStyles ();
  }

  /**
   * Send message to Web Socket
   * 
   * @return {void}
   */
  self.wsSend = function (message) {
    self.write (message);
    websocket.send (message);
  }

  self.init ();
}

var Messenger = new Messenger ();
