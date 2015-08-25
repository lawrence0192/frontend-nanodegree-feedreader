/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    // Suite to test RSS feeds
    describe('RSS Feeds', function() {

        // Test that makes sure RSS feeds are defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test that makes sure a valid URL is defined within each feed
        it('should have a URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toContain('://');
            });
        });

        // Test that makes sure each feed has a name defined that is not empty
        it('should have a name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    // Suite to test menu
    describe('The menu', function() {

        var $menuToggle = $('body').hasClass('menu-hidden');

        // Test to ensure menu element is hidden by default
        it('is initially hidden', function() {
            expect($menuToggle).toBeTruthy();
        });

        var $menuIcon = $('.menu-icon-link');
        var body = document.body;

        // Test that ensures menu shows/hides on alternating clicks
        it('shows/hides on click', function(){
            $menuIcon.trigger('click');
            expect(body.className).not.toBe('menu-hidden');

            $menuIcon.trigger('click');
            expect(body.className).toBe('menu-hidden');
        });
    });

    // Suite to test initial entries
    describe('Initial Entries', function() {

        // Test to ensure loadFeed is called & completed, and there is at least one .entry element w/in the .feed container
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('contains one or more entry elements', function(done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    // Suite to test new feeds
    describe('New Feed Selection', function() {
        // Test to ensure new feed content changes
        var entriesBefore, entriesAfter;
        beforeEach(function(done){
            $('.feed').empty();
            // Set the initial feed with first loadFeed
            loadFeed(0, function() {
                entriesBefore = $('.feed').find('.entry').text();
                // Set the new feed with second loadFeed
                loadFeed(1, function() {
                    entriesAfter = $('.feed').find('.entry').text();
                    done();
                });
            });
        });

        it('has new entries', function(done){
            expect(entriesBefore).not.toEqual(entriesAfter);
            done();
        });
    });
});
