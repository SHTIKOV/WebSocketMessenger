# Web Socket Messenger (**v 0.01**)
> `Web Socket Messenger` is small library for creating simple form for chating
> with using `[websocket.org](websocket.org)`.

## Global variables:
  `Messenger`: Object messenger form
  
## Public methods:
| Name  | Description |
| ------------- | ------------- |
| **`updateTitle`**  | Update messenger title  |
| **`write`**  | Write on page and send message to Web Socket  |
| **`wsSend`**  | Send message to Web Socket  |
| **`removeStyles`**  | Remove styles from form  |

## How to use

### Initialisation:
```
var Messenger = new Messenger ();
```

### Update messenger title:
```
Messenger.updateTitle ("New title");
```

### Write message and send to Web Socket:
```
Messenger.write ("This is small message");
```

### Send message to Web Socket:
```
Messenger.wsSend ("This is small message will send to Web Socket");
```

### Remove styles from DOM:
```
Messenger.removeStyles ();
```
