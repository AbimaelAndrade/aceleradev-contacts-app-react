import React from "react";

class FilterButton extends React.Component {
  render() {
    const { action, type, label, selected } = this.props;

    return (
      <button
        className={`filters__item ${selected === type && "is-selected"}`}
        onClick={() => action(type)}
      >
        {label} <i className="fas fa-sort-down" />
      </button>
    );
  }
}

export default FilterButton;
