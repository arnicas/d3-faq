/* move the currently moused over item to the front */

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

// selected_items.moveToFront();