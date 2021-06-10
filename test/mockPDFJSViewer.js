function DefaultTextLayerFactory() {}
DefaultTextLayerFactory.prototype.createTextLayerBuilder = function() {
  return {
    setTextContent: function() {},
    render: function() {}
  };
};

function EventBus() {}

export default function mockPDFJSViewer() {
  return {
    DefaultTextLayerFactory,
    EventBus
  };
};
