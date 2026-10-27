// Arrow and keyboard control for the photo carousel. Scrolling and swiping work without this.
(function () {
    document.querySelectorAll(".gallery").forEach(function (gallery) {
        var viewport = gallery.querySelector(".gallery-viewport");
        var slides = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-slide"));
        if (!viewport || !slides.length) return;

        // Scroll position that puts `slide` in the middle of the viewport.
        function targetFor(slide) {
            var v = viewport.getBoundingClientRect();
            var s = slide.getBoundingClientRect();
            return viewport.scrollLeft + (s.left - v.left) - (v.width - s.width) / 2;
        }

        function currentIndex() {
            var v = viewport.getBoundingClientRect();
            var mid = v.left + v.width / 2;
            var best = 0, bestDist = Infinity;
            slides.forEach(function (s, i) {
                var r = s.getBoundingClientRect();
                var d = Math.abs(r.left + r.width / 2 - mid);
                if (d < bestDist) { bestDist = d; best = i; }
            });
            return best;
        }

        function centerOn(index) {
            index = Math.max(0, Math.min(slides.length - 1, index));
            viewport.scrollTo({ left: targetFor(slides[index]), behavior: "smooth" });
        }

        gallery.querySelector(".gallery-prev").addEventListener("click", function () { centerOn(currentIndex() - 1); });
        gallery.querySelector(".gallery-next").addEventListener("click", function () { centerOn(currentIndex() + 1); });
        gallery.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft") { e.preventDefault(); centerOn(currentIndex() - 1); }
            if (e.key === "ArrowRight") { e.preventDefault(); centerOn(currentIndex() + 1); }
        });
        gallery.tabIndex = 0;

        // Jump (no animation) to the starting photo once layout is known.
        var start = parseInt(gallery.getAttribute("data-start") || "0", 10);
        function jump() {
            var s = slides[start];
            if (!s) return;
            viewport.style.scrollBehavior = "auto";
            viewport.style.scrollSnapType = "none";
            viewport.scrollLeft = targetFor(s);
            requestAnimationFrame(function () {
                viewport.style.scrollSnapType = "";
                viewport.style.scrollBehavior = "";
            });
        }
        requestAnimationFrame(jump);
        window.addEventListener("load", jump);
    });
})();
