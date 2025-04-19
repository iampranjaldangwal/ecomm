var swiper = new Swiper('.swiper', {
    slidesPerView: 4,  // Show 4 products at a time
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        1024: { slidesPerView: 4 },
        768: { slidesPerView: 2 },
        480: { slidesPerView: 1 }
    }
});


  const carousel = document.querySelector('.category-carousel');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');

  const cardWidth = document.querySelector('.category-card').offsetWidth + 16; // Adjust margin/gap if needed
  const totalCards = document.querySelectorAll('.category-card').length;

  let currentScroll = 0;

  nextBtn.addEventListener('click', () => {
    const maxScroll = cardWidth * totalCards - carousel.offsetWidth;

    if (currentScroll + cardWidth >= maxScroll) {
      // Wrap to start (but in rightward scroll direction)
      currentScroll = 0;
    } else {
      currentScroll += cardWidth;
    }

    carousel.scrollTo({
      left: currentScroll,
      behavior: 'smooth'
    });
  });

  prevBtn.addEventListener('click', () => {
    if (currentScroll - cardWidth < 0) {
      currentScroll = 0;
    } else {
      currentScroll -= cardWidth;
    }

    carousel.scrollTo({
      left: currentScroll,
      behavior: 'smooth'
    });
  });

  const bestSellersWrapper = document.querySelector('#best-sellers-carousel');
  const bestSellersCarousel = bestSellersWrapper.querySelector('.category-carousel');
  const bestSellersNext = bestSellersWrapper.querySelector('.carousel-btn.next');
  const bestSellersPrev = bestSellersWrapper.querySelector('.carousel-btn.prev');
  
  const bestSellersCardWidth = bestSellersCarousel.querySelector('.category-card').offsetWidth + 16; // Adjust margin/gap
  const bestSellersTotalCards = bestSellersCarousel.querySelectorAll('.category-card').length;
  
  let bestSellersScroll = 0;
  
  bestSellersNext.addEventListener('click', () => {
    const maxScroll = bestSellersCardWidth * bestSellersTotalCards - bestSellersCarousel.offsetWidth;
  
    if (bestSellersScroll + bestSellersCardWidth >= maxScroll) {
      bestSellersScroll = 0;
    } else {
      bestSellersScroll += bestSellersCardWidth;
    }
  
    bestSellersCarousel.scrollTo({
      left: bestSellersScroll,
      behavior: 'smooth'
    });
  });
  
  bestSellersPrev.addEventListener('click', () => {
    if (bestSellersScroll - bestSellersCardWidth < 0) {
      bestSellersScroll = 0;
    } else {
      bestSellersScroll -= bestSellersCardWidth;
    }
  
    bestSellersCarousel.scrollTo({
      left: bestSellersScroll,
      behavior: 'smooth'
    });
  });
  