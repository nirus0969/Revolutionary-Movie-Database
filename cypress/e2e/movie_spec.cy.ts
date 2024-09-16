describe('movie spec', () => {
  it('Loads movie card properly', () => {
    cy.visit('/');
    const testMovie = {
      title: 'Oppenheimer',
      runtime: '3h 1min',
      releasedate: '19/07/2023',
      genres: ['Drama', 'History'],
      overview:
        "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    };

    cy.get(`[data-testid="searchpage-moviecard-${testMovie.title}"]`)
      .should('exist')
      .click();

    cy.get(`[data-testid="detailed-moviecard-title-${testMovie.title}"]`)
      .should('exist')
      .should('have.text', testMovie.title);

    cy.get(`[data-testid="detailed-moviecard-releasedate-${testMovie.title}"]`)
      .should('exist')
      .should('have.text', testMovie.releasedate);

    cy.get(`[data-testid="detailed-moviecard-runtime-${testMovie.title}"]`)
      .should('exist')
      .should('have.text', testMovie.runtime);

    cy.get(`[data-testid="detailed-moviecard-overview-${testMovie.title}"]`)
      .should('exist')
      .should('have.text', testMovie.overview);

    for (const genre of testMovie.genres) {
      cy.get(
        `[data-testid="detailed-moviecard-chip-${genre}-${testMovie.title}"]`
      ).should('exist');
    }
  });

  it('Can search for a specific movie', () => {
    cy.visit('/');
    const testMovie = {
      title: 'Barbie',
      runtime: '1h 54min',
      releasedate: '19/07/2023',
      genres: ['Comedy', 'Adventure', 'Fantasy'],
      overview:
        'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.',
    };

    cy.get('[data-testid="searchbar-input"]').should('exist').type(testMovie.title);

    cy.get('[data-testid="searchbar-button"]').should('exist').click();

    cy.get(`[data-testid="searchpage-moviecard-${testMovie.title}"]`)
      .should('exist')
      .click();

    cy.get(`[data-testid="detailed-moviecard-title-${testMovie.title}"]`)
      .should('exist')
      .should('have.text', testMovie.title);

    cy.get(`[data-testid="detailed-moviecard-releasedate-${testMovie.title}"]`)
      .should('exist')
      .should('have.text', testMovie.releasedate);

    cy.get(`[data-testid="detailed-moviecard-runtime-${testMovie.title}"]`)
      .should('exist')
      .should('have.text', testMovie.runtime);

    cy.get(`[data-testid="detailed-moviecard-overview-${testMovie.title}"]`)
      .should('exist')
      .should('have.text', testMovie.overview);

    for (const genre of testMovie.genres) {
      cy.get(
        `[data-testid="detailed-moviecard-chip-${genre}-${testMovie.title}"]`
      ).should('exist');
    }
  });

  it('Can filter movies on genre', () => {
    cy.visit('/');
    const adventureMovies: string[] = [
      'The Marvels',
      'Minions',
      'Inside Out',
      'Barbie',
      'Transformers: Rise of the Beasts',
      'The Flash',
      'Wonder Woman',
    ];

    cy.get(`[data-testid="filteritem-Adventure"]`)
      .should('exist')
      .should('have.text', 'Adventure')
      .click();

    cy.get('[data-testid="searchbar-button"]').should('exist').click();

    for (const movie of adventureMovies) {
      cy.get(`[data-testid="searchpage-moviecard-${movie}"]`).should('exist');

      cy.get(`[data-testid="searchpage-moviecard-title-${movie}"]`)
        .should('exist')
        .should('have.text', movie);

      cy.get(`[data-testid="searchpage-moviecard-${movie}"]`).should('exist').click();

      cy.get(`[data-testid="detailed-moviecard-chip-Adventure-${movie}"]`).should(
        'exist'
      );

      cy.go('back');
    }
  });

  it('Can load movie from different pages', () => {
    cy.visit('/');
    const page1Movies = Array<string>();
    cy.get('[data-testid^="searchpage-moviecard-"]').each(($el) =>
      page1Movies.push($el.text())
    );

    cy.wait(50); // Wait for next page to load
    cy.get('[aria-label="next page button"]').click();
    cy.get('[data-testid^="searchpage-moviecard-"]').each(($el, index) =>
      expect($el.text()).not.to.equal(page1Movies[index])
    );

    cy.wait(50); // Wait for page 1 to load
    cy.get('[aria-label="previous page button"]').click();
    cy.get('[data-testid^="searchpage-moviecard-"]').each(($el, index) =>
      expect($el.text()).to.equal(page1Movies[index])
    );
  });

  it('Can sort movies', () => {
    cy.visit('/search');

    cy.get('[data-testid="sortoption-sortparam-button"]').should('exist').click();

    cy.get('[data-testid="sortoption-sortparam-vote_count"]')
      .should('exist')
      .scrollIntoView()
      .click({ force: true });

    cy.wait(100); // Wait for the movies to be sorted
    cy.get('[data-testid="rating-display-votecount"]')
      .invoke('text')
      .then((text) => {
        const voteCounts = text.match(/\d+/g)?.map(Number);
        if (!voteCounts) {
          throw new Error('No votecounts found');
        }

        for (let i = 0; i < voteCounts.length - 1; i++) {
          console.log(voteCounts[i], voteCounts[i + 1]);
          expect(voteCounts[i]).to.be.gt(voteCounts[i + 1]);
        }
      });
  });
});
