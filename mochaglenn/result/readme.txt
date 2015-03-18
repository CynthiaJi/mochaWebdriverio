webdriver-manager start

online@OnlineTax-L1:~/mochatest/mochaglenn/test$ mocha my_test.js


  My Website
    ✓ Contact form should return success (8651ms)


  1 passing (13s)

 
online@OnlineTax-L1:~/mochatest/mochaglenn/test$ 

online@OnlineTax-L1:~/mochatest/mochaglenn/test$ mocha login.js 


  Online Tax
{ closure_uid_208968580: 321,
  flow_: 
   { events_: {},
     closure_uid_208968580: 1,
     activeFrame_: 
      { events_: {},
        closure_uid_208968580: 169,
        flow_: [Circular],
        parent_: [Object],
        children_: [Object],
        lastInsertedChild_: [Object],
        pendingTask_: null,
        isLocked_: false,
        isBlocked_: false,
        pendingCallback: false,
        pendingRejection: false,
        cancellationError_: null },
     schedulingFrame_: 
      { events_: {},
        closure_uid_208968580: 169,
        flow_: [Circular],
        parent_: [Object],
        children_: [Object],
        lastInsertedChild_: [Object],
        pendingTask_: null,
        isLocked_: false,
        isBlocked_: false,
        pendingCallback: false,
        pendingRejection: false,
        cancellationError_: null },
     shutdownTask_: null,
     eventLoopTask_: null,
     hold_: 
      { _idleTimeout: 2147483647,
        _idlePrev: [Object],
        _idleNext: [Object],
        _idleStart: 1426654847877,
        _monotonicStartTime: 3121849,
        _onTimeout: [Function: wrapper],
        _repeat: true },
     yieldCount_: 7 },
  stack_: null,
  parent_: 
   { closure_uid_208968580: 319,
     flow_: 
      { events_: {},
        closure_uid_208968580: 1,
        activeFrame_: [Object],
        schedulingFrame_: [Object],
        shutdownTask_: null,
        eventLoopTask_: null,
        hold_: [Object],
        yieldCount_: 7 },
     stack_: { [Task: WebDriver.getTitle()] name: 'Task' },
     parent_: null,
     callbacks_: [ [Object] ],
     state_: 'pending',
     handled_: true,
     pendingNotifications_: false,
     value_: undefined },
  callbacks_: null,
  state_: 'pending',
  handled_: false,
  pendingNotifications_: false,
  value_: undefined }
    ✓ Signin As Daad Smith (13514ms)


  1 passing (16s)

online@OnlineTax-L1:~/mochatest/mochaglenn/test$ 

