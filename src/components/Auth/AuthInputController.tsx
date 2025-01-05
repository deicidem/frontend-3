import { Control, FieldErrors, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

type TAuthInputProps = {
	name: string;
	control: Control<any>;
	label: string;
	required?: boolean;
	errors: FieldErrors;
};

export const AuthInputController = ({
	name,
	control,
	label,
	required = false,
	errors,
}: TAuthInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<TextField
					margin='normal'
					label={label}
					type={name === 'password' ? 'password' : 'email'}
					fullWidth
					required={required}
					autoComplete={name === 'email' ? 'email' : undefined}
					error={!!errors[name]?.message}
					helperText={errors[name]?.message as string}
					{...field}
				/>
			)}
		/>
	);
};
