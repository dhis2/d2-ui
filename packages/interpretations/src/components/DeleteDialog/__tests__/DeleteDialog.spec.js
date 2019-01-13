import React from 'react';
import { shallow } from 'enzyme';
import { DeleteDialog } from '../DeleteDialog';
import Button from '@material-ui/core/Button';

const props = {
    classes: {},
    title: 'delete title',
    text: 'dialog content text',
    onDelete: jest.fn(),
    onCancel: jest.fn(),
};

let shallowDeleteDialog;

const deleteDialog = () => {
    if (!shallowDeleteDialog) {
        shallowDeleteDialog = shallow(<DeleteDialog {...props} />);
    }
    return shallowDeleteDialog;
};

describe('components: DeleteDialog -> DeleteDialog component ', () => {
   beforeEach(() => {
        shallowDeleteDialog = undefined;
   });

    it('should call prop onDelete when Yes button is clicked', () => {
        deleteDialog().find(Button)
            .findWhere(button => button.props().children === 'Yes, delete')
            .simulate('click');
        
        expect(props.onDelete).toHaveBeenCalled();
        
    }); 
    
    it('should call prop onCancel when No button is clicked', () => {
        deleteDialog().find(Button)
            .findWhere(button => button.props().children === 'No, cancel')
            .simulate('click');
        
        expect(props.onDelete).toHaveBeenCalled();

    });
});