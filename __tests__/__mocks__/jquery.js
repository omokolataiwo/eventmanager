export default () => ({
  modal: () => {},
  slider: () => {},
  extend: () => {},
  material_select: () => {},
  animate: () => {},
  pickadate: () => {},
  material_chip: (type) => {
    if (type === 'data') {
      return { table: { tag: 'table' }, chair: { tag: 'chair' } };
    }
  },
  on: (event, callback) => {
    if (event === 'chip.add') callback();
  },
  offset: () => ({ top: 0 }),
  val: () => {}
});
