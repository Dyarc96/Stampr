import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { StyledLink } from 'components/ui-components/Misc';

import * as actions from 'actions';
import FormField from 'components/form/FormField';
import { Button, ButtonBlue } from 'components/ui-components/Button';
import { ControlsContainer } from 'components/ui-components/Misc';

const FIELDS = [
	{
		name: 'name',
		label: 'Imię'
	},
	{
		name: 'surname',
		label: 'Nazwisko'
	},
];

let Settings = (props) => {
	const [ changed, setChanged ] = useState(false);
	const { handleSubmit, user, initialize, updateUser } = props;
	const history = useHistory();

	useEffect(() => {
		initialize({
			name: user.name,
			surname: user.surname
		});
	}, [initialize, user]);

	const renderFields = () => {
		return FIELDS.map((element, index) => {
			return <Field key={index} type="text" 
				onChange={() => setChanged(true)}
				label={element.label} component={FormField}
				name={element.name}/>;
		});
	};

	const onSettingsSubmit = (values) => {
		updateUser({
			id: user._id,
			name: values.name,
			surname: values.surname
		});
		history.push('/');
	};

	const redirectToYourAccount = () => {
		history.push('/account');
	};
    
	return (
		<>
			<h2>Ustawienia konta</h2>
			<form>
				{renderFields()}
				<ControlsContainer>
					<Button danger width="80px" onClick={redirectToYourAccount}>
                        Anuluj
					</Button>
					{changed &&
                    <Button width="120px" onClick={handleSubmit(onSettingsSubmit)}>
                        Zaktualizuj
                    </Button>}
				</ControlsContainer>
				{user.isProvider === 'false' &&
                    <StyledLink to="/become-partner">
                    	<ButtonBlue secondary>
                            Zostań Partnerem
                    	</ButtonBlue>
                    </StyledLink>}
			</form>
		</>
	);
};

export default connect(null, actions)(reduxForm({
	form: 'contact'
})(Settings))