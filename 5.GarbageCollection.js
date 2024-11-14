//  When the garbage has been removed from the heap, the Garbage Collector can consider compacting the
//  resulting set of objects to remove the spaces that are between them.
// The process of compaction is complicated because, if any object is moved,
//  the GC must change all the references that exist to it.

// mark and sweep
function markAndSweep() {
  // mark
  mark();
  // sweep
  sweep();
}
function markAndCompact() {
  // mark
  mark();
  // compact
  compact();
}

markAndSweep();
markAndCompact();

function sweep() {
  // sweep all unreachable objects
}
function mark() {
  // mark all reachable objects
}

// 1. Mark and Sweep
// The Mark and Sweep algorithm is one of the foundational garbage collection methods.
//  It operates in two main phases:

// Mark Phase: The algorithm traverses the object graph starting from "root" objects, 
// marking all reachable objects (objects still in use) as "alive."

// Sweep Phase: It then scans through the heap memory and frees up any unmarked objects, 
// as they’re considered unreachable or no longer needed by the program.

// This algorithm is relatively simple and effective but can lead to fragmentation in memory because it doesn’t move objects,
//  leaving gaps in memory where objects have been removed.

// 2. Mark and Compact
// To address memory fragmentation issues, the Mark and Compact algorithm adds a compaction phase after marking:

// Mark Phase: Like Mark and Sweep, it marks all reachable objects starting from root objects.

// Compaction Phase: Instead of sweeping away unmarked objects, 
// it compacts the memory by shifting all marked (alive) objects to one end of the memory, 
// leaving a contiguous block of free memory afterward.

// Key Differences
// Fragmentation: Mark and Sweep can lead to fragmentation, whereas Mark and Compact avoids it.
// Performance: Mark and Sweep is generally faster but might require more time for large applications.
//  Mark and Compact is slower but reduces fragmentation.
// Memory Usage: Both algorithms use memory more efficiently than simple reference counting but in different ways.