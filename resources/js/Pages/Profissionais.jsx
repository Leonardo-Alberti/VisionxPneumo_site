import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Pages/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Mock API functions for demonstration purposes
const fetchProfissionais = async () => {
    // Replace with actual API call
    return [];
};

const createProfissional = async (data) => {
    await axios.post('/profissionais', data);
};

const updateProfissional = async (id, data) => {
    await axios.put(`/profissionais/${id}`, data);
};

const deleteProfissional = async (id) => {
    await axios.delete(`/profissionais/${id}`);
};

const Profissionais = ({ auth }) => {
    const [profissionais, setProfissionais] = useState([]);
    const [currentProfissional, setCurrentProfissional] = useState(null);
    const [form, setForm] = useState({ enterprise: '', name: '', crm: '', phone: '', email: '', password: '' });

    useEffect(() => {
        const loadProfissionais = async () => {
            const data = await fetchProfissionais();
            setProfissionais(data);
        };
        loadProfissionais();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentProfissional) {
            await updateProfissional(currentProfissional.id, form);
        } else {
            await createProfissional(form);
        }
        setForm({ enterprise: '', name: '', crm: '', phone: '', email: '', password: '' });
        setCurrentProfissional(null);
        // Reload profissionais list after operation
        const data = await fetchProfissionais();
        setProfissionais(data);
    };

    const handleEdit = (profissional) => {
        setForm(profissional);
        setCurrentProfissional(profissional);
    };

    const handleDelete = async (id) => {
        await deleteProfissional(id);
        // Reload profissionais list after operation
        const data = await fetchProfissionais();
        setProfissionais(data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profissionais de Saúde</h2>}
        >
            <Head title="Profissionais de Saúde" />

            <div className="py-6">
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nome"
                            className="border p-2 sm:rounded"
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Telefone"
                            className="border p-2 sm:rounded"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border p-2 sm:rounded"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Senha"
                            className="border p-2 sm:rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {currentProfissional ? 'Alterar' : 'Adicionar'}
                    </button>
                </form>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {profissionais.map(profissional => (
                            <tr key={profissional.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{profissional.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{profissional.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{profissional.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(profissional)}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(profissional.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

export default Profissionais;
