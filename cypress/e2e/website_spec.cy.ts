describe('website spec', () => {
  it('Loads website title properly', () => {
    cy.visit('/');

    cy.get('[data-testid="application-title"]')
      .should('exist')
      .should('have.text', 'RMDB');
  });

  it('Loads all the genres expected', () => {
    const genres: string[] = [
      'Adventure',
      'Fantasy',
      'Animation',
      'Drama',
      'Horror',
      'Action',
      'Comedy',
      'History',
      'Western',
      'Thriller',
      'Crime',
      'Documentary',
      'Science Fiction',
      'Mystery',
      'Music',
      'Romance',
      'Family',
      'War',
      'Foreign',
      'TV Movie',
    ];

    cy.visit('/');

    for (const genre of genres) {
      cy.get(`[data-testid="filteritem-${genre}"]`)
        .should('exist')
        .should('have.text', genre);
    }
  });

  it('Loads top 3 movies proprely', () => {
    cy.visit('/');
    const topMovies: string[] = ['Oppenheimer', 'Sound of Freedom', 'The Marvels'];

    for (const movie of topMovies) {
      cy.get(`[data-testid="searchpage-moviecard-${movie}"]`).should('exist');

      cy.get(`[data-testid="searchpage-moviecard-title-${movie}"]`)
        .should('exist')
        .should('have.text', movie);
    }
  });
});
