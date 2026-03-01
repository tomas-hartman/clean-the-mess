// options
// data - tab extension
// history

// API

// storage.update("OPTIONS", { ... }) // UPDATE OPTIONS WITH ...
// storage.remove("OPTIONS", { ... }) // REMOVE ... FROM OPTIONS

// onInstalled
// storage.initialize() // initialize

// -----------------------

// 1. frequently visited:

//
// - hostname (overview)
// - firstVisited
// - lastVisited
// - openCount

// -----------------------

// 2. last open:

// bound to active, needs cleanup & sync with current state
// - tab object
// - openAt | firstVisited
// - lastVisited

// -----------------------

// 3. shadow history - for safari.

// limit to
// - url
