const Pricing = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <p className="mb-3">
        DevPeoples is currently <strong>free to use</strong> for all users. We believe in helping people connect and interact without barriers.
      </p>
      <p className="mb-3">
        In the future, we may introduce premium features for enhanced user experiences, such as:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Boosted profile visibility</li>
        <li>Unlimited chat access</li>
        <li>Exclusive badge or match recommendations</li>
      </ul>
      <p className="mt-4">
        If pricing changes, they will be reflected here along with the payment and refund terms.
      </p>
    </div>
  );
};

export default Pricing;
