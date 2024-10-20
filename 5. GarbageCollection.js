// mark and sweep
function markAndSweep() {
    // mark
    mark();
    // sweep
    sweep();
    // compact
    compact();
}

markAndSweep();

function sweep() {
    // sweep all unreachable objects
}
function mark() {
    // mark all reachable objects
}
function compact() {
    // compact the heap
}

//  When the garbage has been removed from the heap, the Garbage Collector can consider compacting the resulting set of objects to remove the spaces that are between them. 
// The process of compaction is complicated because, if any object is moved, the GC must change all the references that exist to it.