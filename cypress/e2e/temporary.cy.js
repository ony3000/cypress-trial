function colorHex2regex(colorHex) {
  if (!colorHex.match(/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i)) {
    return new RegExp(`(?:${colorHex})`);
  }

  const isShortHex = colorHex.match(/^#[0-9a-f]{3}$/i);

  const [redHex, greenHex, blueHex] = isShortHex
    ? colorHex.match(/[0-9a-f]/gi).map((h) => h.repeat(2))
    : colorHex.match(/[0-9a-f]{2}/gi);
  const fullHex = isShortHex ? `#${redHex}${greenHex}${blueHex}` : colorHex;

  const candidates = [
    isShortHex ? colorHex : null,
    fullHex,
    `rgb\\(${Number.parseInt(redHex, 16)}, ?${Number.parseInt(greenHex, 16)}, ?${Number.parseInt(
      blueHex,
      16,
    )}\\)`,
  ].filter((c) => c);

  return new RegExp(`(?:${candidates.join('|')})`);
}

describe('My To Do Test', () => {
  context('임시 시나리오', () => {
    beforeEach(() => {
      cy.visit('https://todo.wellmade.club')
    })

    it("'/'로 접근 시, '/tasks'로 이동된다", () => {
      cy.url().should('include', '/tasks')
    })

    it("사이드바 숨기기", () => {
      cy.get('.NavigationDrawer_container__13Xo-').should('have.css', 'width', '200px')

      cy.get('.NavigationDrawer_button__REzTA').click()
      cy.get('.NavigationDrawer_container__13Xo-').should('have.css', 'width', '50px')
      cy.get('.NavigationDrawer_overlay__H8e8N').should('not.be.visible')
    })

    it("css에 rem 단위로 지정되어있어도 px 단위로 테스트 됨", () => {
      cy.get('.AppHeader_button__1owkb').should('have.css', 'width', '48px')
    })

    // 간헐적으로 실패함 (원인 파악 필요, 또는 native event를 적당히 사용해서 focus 상태로 만들거나)
    // it("focus 스타일 테스트", () => {
    //   cy.get('.AppHeader_button__1owkb').focus()
    //   cy.get('.AppHeader_button__1owkb').should('to.be.focused')
    //   cy.get('.AppHeader_button__1owkb').should('have.css', 'outline-width', '1px')
    //   cy.get('.AppHeader_button__1owkb').should('have.css', 'outline-style', 'solid')
    //   cy.get('.AppHeader_button__1owkb').should('have.css', 'outline-color').and('match', colorHex2regex('#fff'))
    // })
  })

  context('Native event 테스트 (주의: 테스트 진행 중인 브라우저에 마우스 커서가 들어가면, hover나 focus 등의 상태 테스트는 실패할 수 있음)', () => {
    beforeEach(() => {
      cy.visit('https://todo.wellmade.club')
    })

    it("hover 스타일 테스트", () => {
      cy.get('.AppHeader_button__1owkb').realHover()
      cy.get('.AppHeader_button__1owkb').should('have.css', 'background-color').and('match', colorHex2regex('#1d4ed8')) // bg-blue-700
    })

    it("active 스타일 테스트", () => {
      cy.get('.AppHeader_button__1owkb').realMouseDown()
      cy.get('.AppHeader_button__1owkb').should('have.css', 'background-color').and('match', colorHex2regex('#1e3a8a')) // bg-blue-900
      cy.get('.AppHeader_button__1owkb').realMouseUp()
    })
  })

  context('Snapshot 테스트', () => {
    beforeEach(() => {
      cy.visit('https://todo.wellmade.club')
    })

    it("hover 스타일 테스트", () => {
      let originalComputedStyle
      let hoveredComputedStyle

      cy.get('.AppHeader_button__1owkb').then(($obj) => {
        originalComputedStyle = { ...window.getComputedStyle($obj[0]) }
      })
      cy.wait(500)
      cy.get('.AppHeader_button__1owkb').realHover()
      cy.wait(500)
      cy.get('.AppHeader_button__1owkb').then(($obj) => {
        hoveredComputedStyle = { ...window.getComputedStyle($obj[0]) }

        Object.entries(hoveredComputedStyle).forEach(([key, value]) => {
          if (hoveredComputedStyle[key] !== originalComputedStyle[key]) {
            $obj[0].style[key] = value
          }
        })
      })

      cy.get('.AppHeader_button__1owkb').matchImageSnapshot('AppHeaderButton_hover')
    })
  })
})
