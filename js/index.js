let $show = document.querySelector('.show')

// A function that goes to the start of the show
let setFirstSlide = () => {
	
	let $slide = document.querySelector('.slide:first-child');
	// let $slide = document.querySelector('.slide:nth-child(1)');
	// let $slide = $show.querySelector(':first-child');
	// let $slide = $show.firstElementChild
	// let $slide = document.querySelectorAll('.slide')[0]

	$slide.classList.add('current')

}

// A function that goes to the end of the show
let setLastSlide = () => {
  let $slide = document.querySelector('.slide:last-child');

  $slide.classList.add('current')
}

// Remove ".current" from all ".slide"
let unsetSlides = () => {

}

// Previous slide
let prevSlide = () => {
  // 1. Find the .current element
	let $curr = document.querySelector('.current')

	// 2. Remove the .current class
	$curr.classList.remove('current')

	// 3. Go to the prev sibling element
	let $prev = $curr.previousElementSibling 

	// 4. Check if a slide exist:
	//      - if so, add current
	//      - if not, go to the beginning

	if ($prev != null) {
		// Add the current class
		$prev.classList.add('current')
	} else {
		// Go back to the beginning
		setLastSlide()
	}
}

// Next slide
let nextSlide = () => {
	// 1. Find the .current element
	let $curr = document.querySelector('.current')

	// 2. Remove the .current class
	$curr.classList.remove('current')

	// 3. Go to the next sibling element
	let $next = $curr.nextElementSibling 

	// 4. Check if a slide exist:
	//      - if so, add current
	//      - if not, go to the beginning

	if ($next != null) {
		// Add the current class
		$next.classList.add('current')
	} else {
		// Go back to the beginning
		setFirstSlide()
	}
}

// When the interface has fully loaded...
let windowLoaded = () => {
	setFirstSlide()

	// EVENT LISTENERS
	let $nextBtn = document.querySelector('#next')
  $nextBtn.addEventListener('click', nextSlide)

  let $prevBtn = document.querySelector('#prev')
	$prevBtn.addEventListener('click', nextSlide)

}


// Kick off!
window.addEventListener('load', windowLoaded)


let theStateOfTheInterface = (event) => { 
  
  // How much has scrolled?
  let winY = window.scrollY

  let allSections = '' // Start with blank, in case there are no sections

  // For each section...
  document.querySelectorAll('section').forEach(($sec) => {

    let secH = $sec.scrollHeight  // How tall is this element?
    let topPx = $sec.offsetTop  // How far is the top of this element from the top of the document?
    let botPx = topPx + secH    // How far is the bottom of this element from the top of the document?

    let seenThese = ''  // Start with blank: no class needed

    // If the scroll position is at or below the element, AND it's also above the bottom of the element
    if (winY >= topPx && winY < botPx) {
      seenThese = 'class="seen"'  // add a class to this element
    }

    // If you wanted the above to accumulate elements you have passed, just remove the second condition, like this:
    // if (winY >= topPx) { seenThese = 'class="seen"' }

    // Check the CSS class definition to see what it does (assume each has an <h2>)
    allSections += `<li ${seenThese}><a href="$">${ $sec.querySelector('h2').textContent }</a></li>`
  })

  // Print out all the heading names
  document.querySelector('.nav').innerHTML = allSections
}



window.addEventListener('load', theStateOfTheInterface)
window.addEventListener('scroll', theStateOfTheInterface)
window.addEventListener('resize', theStateOfTheInterface)


let loadMoreContent = (event) => { 
  
  let winH = document.documentElement.clientHeight
  let docH = document.documentElement.scrollHeight
  let winY = window.scrollY
  let maxY = docH - winH

  if (winY >= maxY) {
    // You have definitely hit the bottom

    // Add new content when we hit the bottom
    document.querySelector('#article').innerHTML += `
      <div class="grid-container">
        <div class="item1">Article</div>
        <div class="item2">Article</div>
        <div class="item3">Article</div>  
        <div class="item4">Article</div>
        <div class="item5">Article</div>
        <div class="item6">Article</div>
      </div>
      `
  }
}

window.addEventListener('load', loadMoreContent)
window.addEventListener('scroll', loadMoreContent)
window.addEventListener('resize', loadMoreContent)


