class ScrollController {
    constructor(scrollService, actionBlockService) {
        this.actionBlockService = actionBlockService;
        this.scrollService = scrollService;

        this.view = new ScrollView();
    }

    bindScrollEndPage({onScrollEndPage}) {
        const that = this;
        that.scrollService.bindScroll(onScrollEndPage);
    }

    setPositionTop() {
        window.scrollTo(0, 0);
    }
}
