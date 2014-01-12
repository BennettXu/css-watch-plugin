css-watch-plugin
================

This is a jquery plugin that watch change of css property.

Usage:
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
