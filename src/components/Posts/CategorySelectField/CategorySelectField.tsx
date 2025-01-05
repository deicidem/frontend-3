import React from 'react';
import { Controller } from 'react-hook-form';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from '@mui/material';
import { TCategorySelectFieldProps } from './types';

export const CategorySelectField = ({
	name,
	label,
	control,
	errors,
	options,
	loading = false,
}: Omit<TCategorySelectFieldProps, 'onLoadMore'>) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={{
				required: 'Выберите категорию',
			}}
			render={({ field: { value, onChange } }) => (
				<FormControl fullWidth variant='outlined' error={!!errors[name]}>
					<InputLabel id={`${name}-label`}>{label}</InputLabel>
					<Select
						labelId={`${name}-label`}
						id={name}
						multiple
						value={value || []}
						onChange={(e) => onChange(e.target.value)}
						label={label}
						renderValue={(selected) => {
							if (!selected || selected.length === 0) return '';

							const selectedOptions = options.filter((option) =>
								(selected as string[]).includes(option.id)
							);
							return selectedOptions.map((option) => option.title).join(', ');
						}}>
						{options.map((option) => (
							<MenuItem key={option.id} value={option.id}>
								{option.title}
							</MenuItem>
						))}
					</Select>
					{errors[name] && (
						<FormHelperText>{errors[name]?.message as string}</FormHelperText>
					)}
					{loading && <FormHelperText>Загрузка...</FormHelperText>}
				</FormControl>
			)}
		/>
	);
};
