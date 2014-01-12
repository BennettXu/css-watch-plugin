css-watch-plugin
================

Description:
---
 * This is a jquery plugin that watch change of css property.
 * What makes it outstanding is that 
     * It can monitor some jquery complex property like `offset`, `outerWidth`;
     * It uses polling, which means that every change can be dectected;
     * There is `runs`, `stop` and `reset` apis, which can help you comfortablly control it.



Usage:
---
 1. init: 
    ```
    $.watcher.runs(100);
    ```
 
 2. add watching
    ```
    $('div').watch(['offset', 'width'], function whenChange(){
        console.log('some properties changed')
    })
    ```
    
 3. unwatch
    ```
    $('div').unwatch()
    ```

 4. stop
    ```
    $.watcher.stop()
    ```
 
 5. reset => clear all watching
   ```
   $.watcher.reset()
   ```
